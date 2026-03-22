const express = require('express')
const userModel = require('./src/models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')