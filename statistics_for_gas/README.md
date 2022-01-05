# statistics_for_gas
I'm a Japanese learning statistics.

I made a GAS for people who learning statistics and analyze data as I do.

As I am learning programming, I would like to have many people look at my code and give me feedback.

I will continue to code various statistical methods in the future.

If you have any additional requests, please comment!

***

## Usege

sample data
|x  |y  |
|---|---|
|50 |40 |
|60 |70 |
|70 |90 |
|80 |60 |
|90 |100|

## Example
```
function main() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const x_start_cell = 1
  const y_start_cell = 2
  const end_cell     = 5

  const x_data = sheet
    .getRange(2, x_start_cell, end_cell)
    .getValues()
    .map(x => x[0])

  const y_data = sheet
    .getRange(2, y_start_cell, end_cell)
    .getValues()
    .map(x => x[0])

  /* Calculate the Mean */
  get_avg(x_data)
  //=> 70.0

  /* Calculate the Deviation */
  get_deviation(x_data)
  //=> [-20.0, -10.0, 0.0, 10.0, 20.0]

  /* Calculate the Standard deviation */
  get_variance(x_data)
  //=> 14.142135623730951

  /* Calculate the covariance */
  get_covariance(x_data, y_data)
  //=> 220.0

  /* Calculate the Correlation coefficient */
  get_correlation_coefficient(x_data, y_data)
  //=> 0.728492796385774
}
```
