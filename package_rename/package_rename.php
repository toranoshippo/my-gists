<?php
  require("FileOperation.php");

  $dir = dirname(__FILE__) . '\\javabasic\\';
  $fileoperation = new FileOperation($dir);

  $full_path_files  = $fileoperation->get_full_path_files($dir);
  // var_dump($full_path_files);

  $fileoperation->package_rename($full_path_files, $dir);
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    table{
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    table th,table td{
      padding: 10px 0;
    }

    table tr:nth-child(odd){
      background-color: #eee
    }
  </style>
</head>
<body>
  <h1>ファイルを全件取得</h1>
  <table>
  <?php
    foreach($full_path_files as $f) {
    // foreach($short_path_files as $f) {
  ?>
    <tr>
      <td>
        <?php echo $f ?>
      </td>
    </tr>
  <?php
    }
  ?>
  </table>
</body>
</html>