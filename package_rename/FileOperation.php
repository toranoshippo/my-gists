<?php
  class FileOperation {
    private $dir;

    public function __construct($dir) {
      $this->dir = $dir;
    }

    /**
     * 絶対パスでファイルを全件取得
     * @param $dir: string
     * @return string[]
     * @example array {
     *     "C:\xampp\htdocs\workspace\javabasic\chapter1\A.java"
     *   , "C:\xampp\htdocs\workspace\javabasic\chapter7\mapsample\bean\B.java"
     *   , "C:\xampp\htdocs\workspace\javabasic\src\C.java"
     * }
     */
    public function get_full_path_files($dir) {
      $list = [];
      $files = scandir($dir);
      foreach($files as $file){
        if ($file == '.' || $file == '..') {
          continue;
        } else if (is_dir($dir. $file)) {
          $list = array_merge($list, $this->get_full_path_files($dir. $file. DIRECTORY_SEPARATOR));
        } else if (is_file($dir. $file)) {
          if (substr($file, 0, 1) !== '.') {
            array_push($list, $dir. $file);
          }
        }
      }
      return $list;
    }

    /**
     * workspaceまでのPATHを除外
     * @param array {
     *   $file_list: string[]
     *   $dir:   string
     * }
     * @return string[]
     * @example array {
     *     "chapter1\A.java"
     *   , "chapter7\mapsample\bean\B.java"
     *   , "src\C.java"
     * }
     */
    public function get_short_path_files($file_list, $dir) {
      $list = [];
      foreach($file_list as $f) {
        array_push($list, str_replace($dir, '', $f));
      }
      return $list;
    }

    /**
     * 適切なパッケージ名に書き換える
     * @return void
     */
    public function package_rename($file_list, $dir) {
      foreach ($file_list as $file) {
        $s = str_replace($dir, '', $file);//short-path-name
        if (!preg_match("/^bin/", $s)) {
          $data = file($file);
          // パッケージが書かれていたら削除する
          if (preg_match("/^package/", $data[0])) array_shift($data);
          // デフォルトパッケージ以外のファイル用の適切なパッケージ名を作成する
          if (!$this->is_default_package($s))     $data[0] = $this->create_package_name($s);

          file_put_contents($file, $data);
        }
      }
    }

    /**
     * パッケージ名を生成
     * @return string
     */
    private function create_package_name($s) {
      $package_name = "package ";
      $f = explode("\\", $s);
      $count = count($f) - 1;
      for ($i = 1; $i < $count; $i++) {
        $package_name .= $f[$i]. ".";          
      }
      return substr($package_name, 0, -1). ";";
    }

    /**
     * デフォルトパッケージか判定
     * @return boolean
     */
    private function is_default_package($s) {
      return (substr_count($s, "\\") === 1);
    }
  }
?>