/*jshint esversion: 6 */
/* jshint node: true */
'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: { type: DataTypes.STRING, allowNull: { args: false, msg: 'Please enter your name' } },
        username: { type: DataTypes.STRING, allowNull: { args: false, msg: 'Please enter your username' } },
        email: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email address'
            },
            unique: { args: true, msg: 'Email already exists' },
            validate: { isEmail: { args: true, msg: 'Please enter a valid email address' }, },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: { args: false, msg: 'Please enter a password' },
            validate: {
                isNotShort: (value) => {
                    if (value.length < 8) {
                        throw new Error('Password should be atleast 8 characters long');
                    }
                }
            },
        },
        googleProviderId: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter the Google Provider ID'
            },
            unique: {
                args: true,
                msg: 'Google Provider ID already exists'
            }
        },
        googleProviderToken: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter the Google Provider Token'
            },
            unique: {
                args: true,
                msg: 'Google Provider Token already exists'
            }
        }

    }, {});

    User.associate = (models) => {
        User.hasMany(models.Account, {
            foreignKey: 'userId',
            as: 'accounts'
        });
    }

    return User;
};