public class Tmath {
	/**
	 * 合計値
	 *
	 * @param  { double[] } d - dataset
	 * @return { double }
	 */
	public static double getSum(double[] d) {
		double sum = 0;
		for (double v : d) {
			sum += v;
		}

		return sum;
	}

	/**
	 * 平均値
	 *
	 * @param  { double[] } d - dataset
	 * @return { double }
	 */
	public static double getAvg(double[] d) {
		return Tmath.getSum(d) / d.length;
	}

	/**
	 * 偏差
	 *
	 * @param  { double[] } d - dataset
	 * @return { double }
	 */
	public static double[] getDeviation(double[] d) {
		double avg = Tmath.getAvg(d);
		int max = d.length;

		double[] result = new double[max];
		for (int i = 0; i < max; i++) {
			result[i] = d[i] - avg;
		}

		return result;
	}

	/**
	 * 分散
	 *
	 * @param  { double[] } d - dataset
	 * @return { double }
	 */
	public static double getScattered(double[] d) {
		double sum = 0;
		for (double v : Tmath.getDeviation(d)) {
			sum += Math.pow(v, 2);
		}

		return sum / d.length;
	}

	/**
	 * 共分散
	 *
	 * @param  { double[] } x - x_dataset
	 * @param  { double[] } y - y_dataset
	 * @return { double }
	 */
	public static double getCovariance(double[] x, double[] y) {
		// 配列の数が一致しない場合はプロセスを終了する
		if (x.length != y.length) System.exit(0);

		double[][] dv = {Tmath.getDeviation(x), Tmath.getDeviation(y)};

		double sum = 0;
		for (int i = 0; i < x.length; i++) {
			sum += (dv[0][i]) * (dv[1][i]);
		}

		return sum / x.length;
	}

	/**
	 * 標準偏差
	 *
	 * @param  { double[] } d - dataset
	 * @return { double }
	 */
	public static double getVariance(double[] d) {
		return Math.sqrt(Tmath.getScattered(d));
	}

	/**
	 * 相関係数
	 *
	 * @param  { double[] } x - x_dataset
	 * @param  { double[] } y - y_dataset
	 * @return { double }
	 */
	public static double getCorrelationCoefficient(double[] x, double[] y) {
		return Tmath.getCovariance(x, y) / (Tmath.getVariance(x) * Tmath.getVariance(y));
	}
}
