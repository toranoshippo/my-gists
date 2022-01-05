 class Base {
    public static final String DIR = ".\\";

    public static final String TARGET_FILE = "insert.sql";

    public static final String TARGET_TABLE = "tmp";

    /**
     * COLUMN_LISTとVALUE_LISTのを一致させること
     */
    public static final String COLUMN_LIST[] = {
        "CLIENTN"
        , "CNAME"
        , "ADDRESS"
        , "STAFFNO"
        , "note"
    };
    
    public static final String VALUE_LIST[] = {
        ""
        , "tester"
        , "hoge@example.com"
        , ""
        , "hogehoge"
    };

    public static final String COLUMN_VALUE_DISAGREEMENT_ERROR = "colum数とvalue数が一致していないため終了しました";
}
