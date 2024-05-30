export function timeDifference(previous) {

    var current = new Date()
    previous = new Date(previous)
  
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
  
    var elapsed = previous - current;
  
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds';   
    }
  
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes';   
    }
  
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours';   
    }
  
    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days';   
    }
  
    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months';   
    }
  
    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years';   
    }
  }