// const express = require('express')




const getMain = (req,res) => {
    res.render(`main.ejs`)
}


module.exports = {
    getMain
}