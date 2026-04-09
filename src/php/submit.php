<?php
/**
 * submit.php
 * ----------
 * Receives registration form data via AJAX POST request,
 * validates the input, and appends a tab-separated record
 * to data/submissions.tsv.
 *
 * Called by: js/form.js  →  $.ajax({ url: 'php/submit.php', ... })
 *
 * Response format: JSON
 *   { "status": "ok" }
 *   { "status": "error", "message": "..." }
 */

declare(strict_types=1);

/* ── Configuration ────────────────────────────────────────────── */

/** Path to the TSV data file, relative to this script. */
const DATA_FILE = __DIR__ . '/data/submissions.tsv';

/** Allowed CORS origin ('*' for development; set your domain in production). */
const ALLOWED_ORIGIN = '*';

/* ── Response headers ─────────────────────────────────────────── */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: '   . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

/* Handle preflight OPTIONS request (CORS) */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ── Accept POST only ─────────────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

/* ── Helpers ──────────────────────────────────────────────────── */

/**
 * Trim whitespace and strip HTML tags from a form value.
 *
 * @param  string|null $value  Raw input
 * @return string              Sanitized string
 */
function sanitize(?string $value): string
{
    return htmlspecialchars(
        strip_tags(trim((string) $value)),
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

/**
 * Send a JSON error response and terminate execution.
 *
 * @param int    $httpCode  HTTP status code
 * @param string $message   Error description
 */
function jsonError(int $httpCode, string $message): void
{
    http_response_code($httpCode);
    echo json_encode(['status' => 'error', 'message' => $message]);
    exit;
}

/* ── Read & validate fields ───────────────────────────────────── */
$firstName = sanitize($_POST['first_name'] ?? '');
$lastName  = sanitize($_POST['last_name']  ?? '');
$phone     = sanitize($_POST['phone']      ?? '');
$email     = sanitize($_POST['email']      ?? '');

$errors = [];

if ($firstName === '') {
    $errors[] = 'first_name is required';
}
if ($lastName === '') {
    $errors[] = 'last_name is required';
}
if ($phone === '') {
    $errors[] = 'phone is required';
}
if ($email === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $errors[] = 'a valid email is required';
}

if (!empty($errors)) {
    jsonError(422, implode('; ', $errors));
}

/* ── Build tab-separated record ───────────────────────────────── */
$timestamp = date('Y-m-d H:i:s');

/*
 * Column order: timestamp  first_name  last_name  phone  email
 * Any tab characters inside field values are stripped to keep the
 * TSV format intact.
 */
$clean = static fn(string $v): string => str_replace(["\t", "\r", "\n"], ' ', $v);

$record = implode("\t", [
    $clean($timestamp),
    $clean($firstName),
    $clean($lastName),
    $clean($phone),
    $clean($email),
]) . PHP_EOL;

/* ── Ensure data directory exists ─────────────────────────────── */
$dataDir = dirname(DATA_FILE);

if (!is_dir($dataDir) && !mkdir($dataDir, 0755, true)) {
    jsonError(500, 'Cannot create data directory');
}

/* ── Write to file (append mode, exclusive lock) ──────────────── */
$isNewFile = !file_exists(DATA_FILE);

$handle = fopen(DATA_FILE, 'a');

if ($handle === false) {
    jsonError(500, 'Cannot open data file for writing');
}

if (!flock($handle, LOCK_EX)) {
    fclose($handle);
    jsonError(500, 'Could not acquire file lock');
}

try {
    /* Write TSV column header on first run */
    if ($isNewFile) {
        $header = implode("\t", ['timestamp', 'first_name', 'last_name', 'phone', 'email']) . PHP_EOL;
        fwrite($handle, $header);
    }

    fwrite($handle, $record);

} finally {
    /* Always release lock and close, even if an exception occurs */
    flock($handle, LOCK_UN);
    fclose($handle);
}

/* ── Success ──────────────────────────────────────────────────── */
http_response_code(200);
echo json_encode(['status' => 'ok', 'message' => 'Submission saved successfully']);
