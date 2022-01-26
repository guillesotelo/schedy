const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

adminSchema.pre('save', function (next) {
    const admin = this
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if(saltError) return next(saltError)
            else{
                bcrypt.hash(admin.password, salt, function (hashError, hash) {
                    if(hashError) return next(hashError)
                    admin.password = hash
                    next()
                })
            }
        })
    } else return next()
})

adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password).then(res => res)
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin