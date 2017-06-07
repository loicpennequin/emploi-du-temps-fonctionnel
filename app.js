var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var knex = require('knex')({
        client: 'mysql',
        connection: {
            host     : '127.0.0.1',
            user     : ,
            password : ,
            database : 'planning',
            charset  : 'utf8'
        }
    });
var Bookshelf = require('bookshelf')(knex);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

/////////////////////////////////////////
///////////////MODELS////////////
/////////////////////////////////////////

// org_formation model
var Formation = Bookshelf.Model.extend({
    tableName: 'formations',

    weeks : function(){
        return this.hasMany(Week)
    },

    topics : function(){
        return this.hasMany(Topic)
    },

    rooms : function(){
        return this.hasMany(Room)
    }
});

// week model
var Week = Bookshelf.Model.extend({
    tableName: 'weeks',

    orgFormation : function(){
        return this.belongsTo(Formation)
    },

    days : function(){
        return this.hasMany(Day)
    }
});

//day model
var Day = Bookshelf.Model.extend({
    tableName: 'days',

    week : function(){
        return this.belongsTo(Week)
    },

    courses : function(){
        return this.hasMany(Course)
    }

});

//course model
var Course = Bookshelf.Model.extend({
    tableName: 'courses',

    candidats : function(){
        return this.belongsToMany(Candidat)
    },

    topic : function(){
        return this.belongsTo(Topic, 'topic_id')
    },

    room : function(){
        return this.belongsTo(Room, 'room_id')
    },

    day : function(){
        return this.belongsTo(Day, 'day_id')
    }
});

//topic model
var Topic = Bookshelf.Model.extend({
    tableName : 'topics'
});

//room model
var Room = Bookshelf.Model.extend({
    tableName: 'rooms'
});

//candidats model
var Candidat = Bookshelf.Model.extend({
    tableName : 'candidats',

    courses : function(){
        return this.belongsToMany(Course)
    }
});


/////////////////////////////////////////
///////////COLLECTIONS//////
/////////////////////////////////////////

var Formations  = Bookshelf.Collection.extend({
  model: Formation
});

var Weeks = Bookshelf.Collection.extend({
  model: Week
});;

var Days = Bookshelf.Collection.extend({
    model:  Day
});

var Courses = Bookshelf.Collection.extend({
    model:  Course
});

var Topics = Bookshelf.Collection.extend({
    model : Topic
});

var Rooms = Bookshelf.Collection.extend({
    model : Room
});

var Candidats = Bookshelf.Collection.extend({
    model : Candidat
});

/////////////////////////////////////////
///////////ROUTING///////////////
/////////////////////////////////////////

////////FORMATIONS

app.get('/formations', function (req, res) {
    Formations.forge()
    .fetch()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.get('/formation/:id', function (req, res) {
    Formation.forge({id: req.params.id})
    .fetch({withRelated: ['weeks.days.courses.topic', 'weeks.days.courses.room', 'topics', 'rooms']})
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

////////WEEKS

app.post('/weeks', function (req, res) {
    Week.forge({
        start: req.body.startToMYSQL,
        end: req.body.endToMYSQL,
        formation_id: req.body.formation_id
    })
    .save()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.get('/week:id', function (req, res) {
    Week.forge({id: req.params.id})
    .fetch({withRelated: ['days.courses']})
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

////////DAYS

app.get('/days', function (req, res) {
    Days.forge()
    .fetch()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.post('/days', function (req, res) {
    Day.forge({
        week_id: req.body.week_id
    })
    .save()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

////////COURSES

app.post('/courses', function(req, res){
    Course.forge({
        day_id: req.body.day_id,
        topic_id: req.body.topic.id,
        room_id: req.body.room.id,
        start: req.body.startToMYSQL,
        end: req.body.endToMYSQL
    })
    .save()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).json({error: true, data: {message: err.message}});
    });
})

app.put('/course/:id', function (req, res) {
    Course.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (course) {
        course.save({
            day_id: course.get('day_id'),
            topic_id: req.body.topic.id || course.get('topic_id'),
            room_id: req.body.room.id || course.get('room_id'),
            start: req.body.startToMYSQL || course.get('start'),
            end: req.body.endToMYSQL || course.get('end')
        }, {patch: true})
        .then(function () {
        res.json({error: false, data: {message: 'course details updated'}});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({error: true, data: {message: err.message}});
        });
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).json({error: true, data: {message: err.message}});
    });
  })

app.delete('/course/:id', function (req, res) {
    Course.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (course) {
        course.destroy()
        .then(function () {
            res.json({error: true, data: {message: 'course successfully deleted'}});
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

////////TOPICS

app.post('/topics', function(req, res){
    Topic.forge({
        name: req.body.name,
        color: req.body.color,
        formation_id: req.body.formation_id
    })
    .save()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
})

app.delete('/topic/:id', function (req, res) {
    Topic.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (topic) {
        topic.destroy()
        .then(function () {
            res.json({error: true, data: {message: 'topic successfully deleted'}});
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

////////ROOMS

app.post('/rooms', function(req, res){
    Room.forge({
        name: req.body.name,
        formation_id: req.body.formation_id
    })
    .save()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
})

app.delete('/room/:id', function (req, res) {
    Room.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (room) {
        room.destroy()
        .then(function () {
            res.json({error: true, data: {message: 'room successfully deleted'}});
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

////////CANDIDATS

app.get('/candidats', function (req, res) {
    Candidats.forge()
    .fetch({withRelated: ['courses.topic', 'courses.room']})
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.post('/candidats', function (req, res) {
    Candidat.forge({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        formation_id: req.body.formation_id
    })
    .save()
    .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.delete('/candidats/:id', function (req, res) {
    Candidat.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (candidat) {
        candidat.destroy()
        .then(function () {
            res.json({error: true, data: {message: 'candidate successfully deleted'}});
        })
        .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
    })
    .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.post('/candidats/courses', function(req, res) {
    Course.forge({id: req.body.course})
    .fetch()
    .then(function(course){
        Candidat.forge({id: req.body.candidat})
        .fetch({withRelated: ['courses']})
        .then(function(candidat){
            candidat.courses().attach(req.body.course);
            res.json({error: true, data: {message: 'candidate successfully registered'}});
        })
        .catch(function(error){
            res.status(500).json({error: true, data: {message: err.message}});
        })
    })
    .catch(function(error){
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.post('/candidats/courses/unsub', function(req, res) {
    Course.forge({id: req.body.course})
    .fetch()
    .then(function(course){
        Candidat.forge({id: req.body.candidat})
        .fetch({withRelated: ['courses']})
        .then(function(candidat){
            candidat.courses().detach(req.body.course);
            res.json({error: true, data: {message: 'candidate successfully unregistered'}});
        })
        .catch(function(error){
            res.status(500).json({error: true, data: {message: err.message}});
        })
    })
    .catch(function(error){
        res.status(500).json({error: true, data: {message: err.message}});
    });
});

//////// 404
app.use(function(req, res, next){
      res.setHeader('Content-Type', 'text/plain');
      res.send(404, 'Page introuvable !');
});

app.listen(8000);
