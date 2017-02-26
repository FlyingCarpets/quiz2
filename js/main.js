var task;

var buildTask = (function() {
  
  var taskList = [];
  var randomNum;
  
  function Task(image,answer) {
    this.image = image;
    this.answer = answer;
  }
  
  function publicGetTaskData(data_path) {
    $.getJSON(data_path, function (data) {
      data.questions.map(function(data) {
        taskList.push(data);
      });
      publicSelectRandomNum();
    });
  }
  
  function publicSelectRandomNum() {
    if(taskList.length > 0) {
       randomNum = Math.floor(Math.random() * taskList.length);
       buildRandomTask(); 
      } else {
        alert('pabaiga');
      }
  }
  
  function buildRandomTask() {
    task = new Task(taskList[randomNum].image, taskList[randomNum].answer);
      taskList.splice(randomNum, 1);
      placeTask(task);
  }
  return {
     getTaskData: publicGetTaskData,
     selectRandomNum: publicSelectRandomNum
  }
}());

var placeTask = function() {
 return function(task) {
   document.getElementById('randomImage').src = task.image;
 }; 
}();

var checkAnswer = (function() {
  return function() {
    var insertedAnswer = document.getElementById('userAnswer').value.toLowerCase();
    if(insertedAnswer == task.answer) {
         alert('hoorah!');
         buildTask.selectRandomNum();
      } else {
         alert('try again');
      }
    }; 
}());


buildTask.getTaskData('https://raw.githubusercontent.com/FlyingCarpets/quiz2/gh-pages/data/questions.json');
