app.filter('teacherFilter', function () {
  return function (teachers, topic) {
    var filtered = [];
    for (let i = 0; i < teachers.length; i++) {
        var teacher = teachers[i];
        for (let j = 0 ; j < teacher.topics.length; j++){
            let ttopic = teacher.topics[j];
            if (ttopic.id == topic.id){
                filtered.push(teacher)
            }
        }
    }
    return filtered
  };
});
