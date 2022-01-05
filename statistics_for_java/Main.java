public class Main {

	public static void main(String[] args) {
		double[] xDataset = {
				50, 60, 70, 80, 90
		};
		double[] yDataset = {
				40, 70, 90, 60, 100
		};

		System.out.println(Tmath.getDeviation(xDataset)[0]);
		
		System.out.println(Tmath.getCorrelationCoefficient(xDataset, yDataset));
	}

}
