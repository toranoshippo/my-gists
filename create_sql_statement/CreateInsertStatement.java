import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;

/**
 * tmpテーブル用データ追加
 * @param args[0] INSERT実行レコード数
 * @example java Main 50
 */
class CreateInsertStatement extends Base {
  public static void main(String args[]) throws IOException {
    if (Base.COLUMN_LIST.length != Base.VALUE_LIST.length) {
      System.out.println(Base.COLUMN_VALUE_DISAGREEMENT_ERROR);
      break;
    }

    int loop_cnt = Integer.parseInt(args[0]);
    String file = Base.DIR + Base.TARGET_FILE;
    File f = new File(file);
    BufferedWriter bw = new BufferedWriter(new FileWriter(f));
    bw.write(createInsertHead());
    bw.newLine();

    for (int i = 1; i <= loop_cnt; i++) {
      String insert_body = " (";

      for (int n = 0; n < Base.VALUE_LIST.length; n++) {
        if (Base.VALUE_LIST[n] == "") {
          insert_body += i;
        } else {
          insert_body += Base.VALUE_LIST[n] + "'";
        }
        if (n+1 != Base.VALUE_LIST.length) {
          insert_body += ", ";
        }
      }

      bw.write(insert_body);
      bw.write(")");

      if (i == loop_cnt) {
        break;
      }

      bw.write(",");
      bw.newLine();
    }

    bw.newLine();
    bw.write(";");
    bw.close();
    System.out.println("実行成功: " + loop_cnt + "レコード追加するINSERT文を生成しました");
  }
  /*
   * @exmaple (Execution result)
   * INSERT INTO tmp ( CLIENTN,  CNAME,  ADDRESS,  STAFFNO,  note ) VALUE
   */
  private static String createInsertHead() {
    StringBuilder insert_head = new StringBuilder("INSERT INTO " + Base.TARGET_TABLE + " (");

    for (int i = 0; i < Base.COLUMN_LIST.length; i++){
      insert_head.append(" " + Base.COLUMN_LIST[i]);

      if (i+1 != Base.COLUMN_LIST.length) {
        insert_head.append(", ");
      } else {
        insert_head.append(") VALUES");
        break;
      }
    }
    return new String(insert_head);
  }
}
