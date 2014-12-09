<h3>ryanDraw</h3>

ryanDraw 0.1 is a JavaScript plugin which enables the easy drawing of shapes onto a canvas. 
So far the following functions have been implemented:

<ul>
  <li>draw.rect - Draws a rectangle on the screen</li>
  <li>draw.sqr  - Draws a square on the screen</li>
  <li>draw.ln   - Draws a line on the screen</li>
  <li>draw.pt   - Draws a point on the screen</li>
</ul>

<h3>Functions Overview</h3>

<table id="table" width="100%">
  <thead>
    <tr>
      <th>Function Name</th>
      <th>Function Description</th>
      <th>Function Parameters</th>
    </tr>
  </thead>
  <tbody>
	<tr>
      	<td>debug</td>
      	<td>Log debug information to the console</td>
    	<td>
		    <table id="debug">
				<thead>
				    <tr>
				      <th>Param</th>
				      <th>Type</th>
				      <th>Example</th>
				    </tr>
				</thead>
				<tbody>
					<tr>
						<th>state</th>
						<th>Boolean</th>
						<th>true || false</th>
					</tr>
					<tr>	
						<td colspan="3">
							<strong>Example: </strong> <br />
							<code>							
							draw.setDebug(true); <br />
							</code>
						</td>					
					</tr>
				</tbody>
			</table>
		</td>
	</tr>
    <tr>
      <td>rect</td>
      <td>Draws a recentagle onto the screen.</td>
      <td>
        <table id="rect">
          <thead>
            <tr>
              <th>Param</th>
              <th>Type</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>x coordinate</td>
              <td>Integer</td>
              <td>0</td>
            </tr>
			<tr>
              <td>y coordinate</td>
              <td>Integer</td>
              <td>0</td>
            </tr>
			<tr>
              <td>width</td>
              <td>Integer</td>
              <td>500</td>
            </tr>
			<tr>
              <td>height</td>
              <td>Integer</td>
              <td>500</td>
            </tr>
			<tr>
              <td>line colour</td>
              <td>String</td>
              <td>#FFF or rgb(255,255,255)</td>
            </tr>
			<tr>
              <td>fill colour</td>
              <td>String</td>
              <td>#FFF or rgb(255,255,255)</td>
            </tr>
			<tr>	
				<td colspan="3">
					<strong>Example: </strong> <br />
					<code>
					rect(0, 0, 500, 500, 'rgb(50,50,50)', 'rgb(50,50,50)'); <br />
					</code>
				</td>
			</tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
