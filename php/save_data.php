<?php
print_r($_POST);
if ($_POST) {
    file_put_contents('./emails.csv',  $_POST['email'] . '\n ', FILE_APPEND);
}