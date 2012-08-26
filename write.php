<?php
$d = new DateTime();
$filename = 'docs/' . $d->format('Ymd') . '.txt';
$r = file_put_contents($filename, $_POST['contents']) or die("can't open file");
