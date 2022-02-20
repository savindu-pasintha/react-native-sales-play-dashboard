import { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { NativeModules } from "react-native";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }
    const db = SQLite.openDatabase("db.db");
    return db;
}
//const db = openDatabase();
const create = (table_name) => {
    const db = openDatabase();
    var res = false;
    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists " + table_name + " (id integer primary key not null, done int, value text);"
        );
        res = true;
    });
    return true;
}
const add = (text) => {
    const db = openDatabase();
    var res = false;
    if (text === null || text === "") {
        return false;
    }
    db.transaction(
        (tx) => {
            tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
            res = true;
        },
        null,
        forceUpdate
    );
    return res;
};
const update = (id) => {
    const db = openDatabase();
    var res = false;
    db.transaction(
        (tx) => {
            tx.executeSql(`update items set done = 1 where id = ?;`, [id,]);
            res = true;
        },
        null,
        forceUpdate
    );
    return res;
}
const remove = (id) => {
    const db = openDatabase();
    var res = false;
    db.transaction(
        (tx) => {
            tx.executeSql(`delete from items where id = ?;`, [id]);
            res = true;
        },
        null,
        forceUpdate
    );
    return res;
}

const show = (id) => {
    const db = openDatabase();
    var data = "";
    db.transaction(
        (tx) => {
            tx.executeSql("select * from items", [], (_, { rows }) =>
                data = JSON.stringify(rows)
            );
        },
        null,
        forceUpdate
    );

    return data;
}

module.exports = { create, add, update, remove, show };