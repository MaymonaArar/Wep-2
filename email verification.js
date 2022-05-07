const emailValidator =require('email-validator')
const express =require('express')
const app = express()
app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.html')})
app.get('/emailvalidate',(req,res) =>{
    var email =req.query.email
    if (emailValidator.validate(email)){
        res.send("Check your emai")
        console.log("Email sent" + info.response)
        console.log(error)}
    else{
        res.send("Email is")}})
app.listen(4000,() =>{
    console.log("App is listening on Port 4000")})
var nodeemailr= require('nodemailer')
var transport = nodeemailr.createTransport({
    service:'gmail',
    auth:{
      user:'ahmadayham2002T.H@gmail.com',
      pass: ''}})
var mailOptions ={
  from :'STRONG TOGETHER',
  to: 'ahmadayhm19999@gmail.com',
  subject: 'your are joined to STRONG TOGETHER  ',
  text: 'Go to the website'}
transport.sendMail(mailOptions,function(error,info){
  if (error){
    console.log(error)}
  else{
    console.log("Email sent" + info.response)}})