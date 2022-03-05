'use strict';
{
    const tasks = []; //入力したタスクを格納する配列
    const inputTask = (name, status = '作業中') => {
        // tasks配列の末尾に、タスクオブジェクトをプッシュする
        const newtask = {
            name:  name,
            status: status,
        }; 
        tasks.push(newtask);    
    }

    // HTML要素に、クラス名＆テキストを追加する。関数
    const addClassAndText = (element, text, className) => {
        element.classList.add(className);
        element.textContent = text;
    }

    // テーブルに記載のタスクをすべて削除する関数 
    const deleteTaskTable = () => {
        document.getElementById('tbody').textContent='';
    }

    // ステータスボタンを生成する関数
    const createStatusBtn = (task, tr) => {
        // ボタン作成
        const button = document.createElement('button');
        addClassAndText(button, task.status, 'statusButton');
        // td取得＆ボタン追加
        const td = tr.getElementsByClassName('status')[0]
        td.appendChild(button);
        
        button.addEventListener('click', () => {
            // 削除ボタンを押されたタスクのIDとStatusを取得
            const id = tr.getElementsByClassName('id')[0].textContent;
            const status = button.textContent;
            const complete = '完了';
            const working = '作業中';

            // ブラウザ上の表示とtasks配列のstatusを、作業中⇔完了で変更
            switch (status) {
                case working:
                    tasks[id].status = complete;
                    button.textContent = complete;
                    break;
                    
                case complete:
                    tasks[id].status = working;
                    button.textContent = working;                    
                    break;
            }
        });
    }

    // 削除ボタンを生成する関数
    const createDeleteBtn = (tr) => {
        // ボタン作成
        const button = document.createElement('button');
        addClassAndText(button, '削除', 'deleteButton');
        // td取得＆ボタン追加
        const td = tr.getElementsByClassName('status')[0]
        td.appendChild(button);
        button.addEventListener('click', () => {
            // 削除ボタンを押されたタスクのIDを取得
            const id = tr.getElementsByClassName('id')[0].textContent;
            deleteTask(id);            
        });
    }

    // tasks配列から対象のタスクオブジェクトを削除し、ブラウザにtasks配列の中身を再描画する関数
    const deleteTask = (id) => {
        tasks.splice(id, 1);  //削除を押されたタスクをtasks配列から削除
        // どのラジオボタンが選択されている状態か取得し、描画が崩れないように削除
        document.getElementsByName('radiobutton').forEach((value, index) => {
            if(value.checked) {
                choiceRefelshMethod(index);
            }
        });
    }

    // ブラウザの再描画する関数
    const choiceRefelshMethod = (index) => {
        const all = 0; //ラジオボタンのすべてが選択
        const working = 1; //ラジオボタンの作業中が選択
        const complete = 2; //ラジオボタンの完了が選択
        
        switch (index) {
            case all: //すべて再描画
                refleshTable();
                break;
            case working: //作業中のタスクのみ再描画
                filterTask('作業中');
                break;
            case complete: //完了のタスクのみ再描画
                filterTask('完了');
                break;
        }
    }

    // ブラウザに表示されているタスクを一旦削除してから再描画する関数
    const refleshTable = () => {
        // HTMLのtbodyの中身を空にして、ブラウザ上のタスクを消す。
        const tbody = document.getElementById('tbody');
        deleteTaskTable(tbody);

        tasks.forEach((value, index) => {
                // trの作成
                const tr = document.createElement('tr');
                // tdの作成
                const id = document.createElement('td');
                const name = document.createElement('td');
                const status = document.createElement('td');
                // 各HTML要素に、テキストとクラス名を追加
                addClassAndText(id, index, 'id');
                addClassAndText(name, value.name, 'taskName' );
                addClassAndText(status, '', 'status');
                // trの中にtdを追加
                tr.appendChild(id);
                tr.appendChild(name);
                tr.appendChild(status);
                // 状態列にボタンをそれぞれ追加
                createStatusBtn(value, tr);
                createDeleteBtn(tr);
                // テーブルにtrを追加
                tbody.appendChild(tr);
        });
    }
    
    // ラジオボタンが変更されたときに、ブラウザの描画を行うイベント
    document.getElementsByName('radiobutton').forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            const radio = radioButton.value //選択されたラジオボタンを取得
            const complete = '完了';
            const working = '作業中';
            switch (radio) {
                case 'all':
                    refleshTable();
                    break;
                case 'working':
                    filterTask(working);
                    break;
                case 'complete':
                    filterTask(complete);
                    break;
            }
        });
    })

    // 選択されたラジオボタンに応じてブラウザのタスクを非表示にする。
    const filterTask = (status) => {
        const tr = document.getElementById('tbody').getElementsByTagName('tr');
        refleshTable();
        tasks.forEach((value, index) => {
            if (value.status !== status) {
                tr[index].style.display = 'none';
            }
        })    
    }
    
    // 新しいタスクを追加する関数: tasksに、新しいタスクを追加して表示する 
    const addTask = (taskName) => {
        const tasks = inputTask(taskName);
        refleshTable();
    }

    // 追加ボタンをクリックすると発生するイベント
    document.getElementById('btn').addEventListener('click', () => {
        const taskName = document.getElementById('taskName').value; 
        addTask(taskName);
    })

}