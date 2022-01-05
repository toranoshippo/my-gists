import math
import sys

def main():
    try:
        val = float(sys.argv[1])
        print(math.radians(val))
    except IndexError:
        print("実行時にパラメータを入れてください")
if __name__ == "__main__":
    main()
