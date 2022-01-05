import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        final int TARGET_NUMBER = 8;
        final int ZERO = 0;
        final String POWER_SYMBOL = "^";
        final String MOLTIPLICATION_SYMBOL = "×";

        // TODO: 素数を求めるロジックにリファクタリングする
        final int TWO = 2;
        final int THREE = 3;
        final int FIVE = 5;
        final int SEVEN = 7;
        final int ELEVEN = 11;
        final int THIRTHEEN = 13;
        final int SEVENTEEN = 17;
        final int NINETEEN = 19;
        final int TWENTYTHREE = 23;
        final int TWENTYNINE = 29;


        int two_cnt, three_cnt, five_cnt, seven_cnt, eleven_cnt, thirteen_cnt, seventeen_cnt, nineteen_cnt, twentyThree_cnt, twentyNine_cnt;
            two_cnt = three_cnt = five_cnt = seven_cnt = eleven_cnt = thirteen_cnt = seventeen_cnt = nineteen_cnt = twentyThree_cnt = twentyNine_cnt = 1;

        int target_number_alias = TARGET_NUMBER;
        HashMap<String, Integer> hashmap = new HashMap<>();
        
        while (target_number_alias != 1) {
            if (target_number_alias %  TWO == ZERO) {
                target_number_alias /=  TWO;
                hashmap.put(Integer.toString(TWO), two_cnt++);
            } else if (target_number_alias % THREE == ZERO) {
                target_number_alias /=  THREE;
                hashmap.put(Integer.toString(THREE), three_cnt++);
            } else if (target_number_alias % FIVE == ZERO) {
                target_number_alias /=  FIVE;
                hashmap.put(Integer.toString(FIVE), five_cnt++);
            } else if (target_number_alias % SEVEN == ZERO) {
                target_number_alias /=  SEVEN;
                hashmap.put(Integer.toString(SEVEN), seven_cnt++);
            } else if (target_number_alias % ELEVEN == ZERO) {
                target_number_alias /=  ELEVEN;
                hashmap.put(Integer.toString(ELEVEN), eleven_cnt++);
            } else if (target_number_alias % THIRTHEEN == ZERO) {
                target_number_alias /=  THIRTHEEN;
                hashmap.put(Integer.toString(THIRTHEEN), thirteen_cnt++);
            } else if (target_number_alias % SEVENTEEN == ZERO) {
                target_number_alias /=  SEVENTEEN;
                hashmap.put(Integer.toString(SEVENTEEN), seventeen_cnt++);
            } else if (target_number_alias % NINETEEN == ZERO) {
                target_number_alias /=  NINETEEN;
                hashmap.put(Integer.toString(NINETEEN), nineteen_cnt++);
            } else if (target_number_alias % TWENTYNINE == ZERO) {
                target_number_alias /=  TWENTYNINE;
                hashmap.put(Integer.toString(TWENTYNINE), twentyThree_cnt++);
            }
        }
        
        String prime_factorization_result = "";
        for (Map.Entry<String, Integer> entry : hashmap.entrySet()) {
            prime_factorization_result += entry.getKey() + POWER_SYMBOL + entry.getValue() + MOLTIPLICATION_SYMBOL;
        }

        if (prime_factorization_result.endsWith(MOLTIPLICATION_SYMBOL)) {
           int last = prime_factorization_result.lastIndexOf(MOLTIPLICATION_SYMBOL);
           prime_factorization_result = prime_factorization_result.substring(ZERO, last);
        }

        System.out.print(prime_factorization_result.replace(POWER_SYMBOL + "1", ""));    
    }
}
