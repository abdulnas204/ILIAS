	var serverdate = -1;
	var unsaved = true;
	
	function setWorkingTime()
	{
		if (serverdate == -1) 
		{
			var n = new Date({YEAR}, {MONTHNOW}, {DAYNOW}, {HOURNOW}, {MINUTENOW}, {SECONDNOW});
			serverdate = n.getTime() / 1000;
		}
		else
		{
			serverdate++;
		}
		var startd = new Date({YEAR}, {MONTH}, {DAY}, {HOUR}, {MINUTE}, {SECOND});
		var enddtime = -1;
<!-- BEGIN enddate -->		
		var endd = new Date({ENDYEAR}, {ENDMONTH}, {ENDDAY}, {ENDHOUR}, {ENDMINUTE}, {ENDSECOND});
		enddtime = endd.getTime() / 1000;
<!-- END enddate -->		
		var ptime_m = {PTIME_M};
		var ptime_s = {PTIME_S};
		var minute = "{STRING_MINUTE}";
		var minutes = "{STRING_MINUTES}";
		var second = "{STRING_SECOND}";
		var seconds = "{STRING_SECONDS}";
		var timeleft = "{STRING_TIMELEFT}";
		var and = "{AND}";
		var now = serverdate;
		var then = startd.getTime() / 1000;
		// time since start in seconds
		var diff = Math.floor(now - then);
		// available time
		var avail = ptime_m * 60 + ptime_s - diff;
		if (avail < 0)
		{
			avail = 0;
		}
		if (enddtime > -1)
		{
			var diffToEnd = Math.floor(enddtime - now);
			if ((diffToEnd > 0) && (diffToEnd < avail))
			{
				avail = diffToEnd;
			}
			else if (diffToEnd < 0)
			{
				avail = 0;
			}
		}
		if ((avail <= 0) && unsaved)
		{
			unsaved = false;
// fau: testNav - call saveOnTimeReached in the new control script
            if (typeof il.TestPlayerQuestionEditControl != 'undefined')
            {
                il.TestPlayerQuestionEditControl.saveOnTimeReached();
            }
// fau.
		}
		var avail_m = Math.floor(avail / 60);
		var avail_s = avail - (avail_m * 60);
		var output = avail_m + " ";
		if (avail_m == 1)
		{
			output += minute;
		}
		else
		{
			output += minutes;
		}
		if (avail < 300)
		{
			if (avail_s < 10)
			{
				output += " " + and + " 0" + avail_s + " ";
			}
			else
			{
				output += " " + and + " " + avail_s + " ";
			}
			if (avail_m == 0)
			{
				if (avail_s < 10)
				{
					output = "0" + avail_s + " ";
				}
				else
				{
					output = avail_s + " ";
				}
			}
			if (avail_s == 1)
			{
				output += second;
			}
			else
			{
				output += seconds;
			}
		}
		var span = document.getElementById("timeleft");
		span.innerHTML = timeleft.replace(/%s/, output);
	}
	window.setWorkingTime = setWorkingTime;
	
	window.setInterval('setWorkingTime()',1000);