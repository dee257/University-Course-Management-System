var express = require("express");
var app = express();
app.use  (express.json());
courses={"Course1":[],"Course2":[], "Course3":[]}
stud = {}
pwd = {}
student={}
var stud_name;
app.set('views','./views');
app.set('view engine','pug')
app.use(express.urlencoded({extended: true}));
app.get('/adduser',function(req,res)
{
    res.render("addusr",{appName: "University Course Management System"});
});
app.post('/adduser',function(req,res)
{
    pwd[req.body.user]=req.body.pwd;
    student[req.body.user]=[];
    res.send("User Successfully Added");
});
app.get('/login',function(req,res)
{
    res.render("login",{appName: "University Course Management System"});
});
app.post('/login',function(req,res)
{
    flag=0;
    for(key in pwd)
    {
        if(key===req.body.user && pwd[key]===req.body.pwd)
        {
            stud_name=key;
            flag=1;
            return res.redirect("/addcourse");
        }
    }
    if(flag==0)
    {
        res.send("User not found");
    }
});

app.get('/addcourse', function(req,res)
{
    res.render("addcourse",{appName: "University Course Management System"});
});

app.post("/addcourse",function(req,res)
{
    flag = 0;
    for (var key in courses) 
    {
        if (key===req.body.course) 
        {
            flag=1;
            courses[key].push(stud_name);
            student[stud_name].push(key);
            res.send("Successfully Registered");
        }
    }
    if(flag==0)
    {
        res.send("Course not found");
    }
});

app.get("/deletecourse",function(req,res)
{
    res.render("deletecourse",{appName: "University Course Management System"});
});

app.post("/deletecourse", function(req,res)
{
    flag=0;
    student[stud_name].forEach (function(val) {
        if (req.body.course===val) {
            flag=1;
            student[stud_name].splice(student[stud_name].indexOf(req.body.course),1);
            courses[req.body.course].splice(courses[req.body.course].indexOf(stud_name),1);
            res.send("Sucessfully Deleted");
        }
    });
    if(flag==0)
    {
        res.send("Course not registered");
    }
});

app.get("/listcourses", function(req,res)
{
    res.send(student[stud_name]);
});

app.get("/viewcourse", function(req,res)
{
    res.render("viewcourse",{appName: "University Course Management System"});
});

app.post("/viewcourse", function(req,res)
{
    for(var key in courses) {
        if(req.body.course===key) {
            var l=courses[req.body.course].length;
            if(l>=5) {
                //res.write(courses[req.body.course]);
                res.send("Course Confirmed");
                //res.end();
            }
            else{
                //res.write(courses[req.body.course]);
                res.send("Course not Confirmed");
                //res.end();
            }
        }
    }
});

app.listen(3000)