<?php

declare(strict_types=1);

const DATA_FILE = __DIR__ . '/data/submissions.tsv';
const ALLOWED_ORIGIN = '*';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: '   . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

function sanitize(?string $value): string
{
    if ($value === null) return '';
    return htmlspecialchars(
        strip_tags(trim($value)),
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

function jsonError(int $httpCode, string $message): void
{
    http_response_code($httpCode);
    echo json_encode(['status' => 'error', 'message' => $message]);
    exit;
}

$firstName = sanitize($_POST['first_name'] ?? '');
$lastName  = sanitize($_POST['last_name']  ?? '');
$phone     = sanitize($_POST['phone']      ?? '');
$email     = sanitize($_POST['email']      ?? '');

$errors = [];

if ($firstName === '') $errors[] = 'first_name is required';
if ($lastName === '')  $errors[] = 'last_name is required';
if ($phone === '')     $errors[] = 'phone is required';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'a valid email is required';
}

if (!empty($errors)) {
    jsonError(422, implode('; ', $errors));
}

$timestamp = date('Y-m-d H:i:s');
$clean = fn(string $v): string => str_replace(["\t", "\r", "\n"], ' ', $v);

$record = implode("\t", [
    $clean($timestamp),
    $clean($firstName),
    $clean($lastName),
    $clean($phone),
    $clean($email),
]) . PHP_EOL;

$dataDir = dirname(DATA_FILE);

if (!is_dir($dataDir) && !mkdir($dataDir, 0755, true)) {
    jsonError(500, 'Internal Server Error: Data storage failure');
}

$isNewFile = !file_exists(DATA_FILE);
$handle = fopen(DATA_FILE, 'a');

if ($handle === false) {
    jsonError(500, 'Internal Server Error: File access denied');
}

if (flock($handle, LOCK_EX)) {
    try {
        if ($isNewFile) {
            $header = implode("\t", ['timestamp', 'first_name', 'last_name', 'phone', 'email']) . PHP_EOL;
            fwrite($handle, $header);
        }
        fwrite($handle, $record);
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
} else {
    fclose($handle);
    jsonError(500, 'Internal Server Error: Could not lock file');
}

http_response_code(200);
echo json_encode([
    'status' => 'ok', 
    'message' => 'Submission saved successfully'
]);