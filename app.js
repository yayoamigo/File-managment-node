const fs = require('fs/promises');

( async () => {
    const fileHandler = await fs.open('./commands.txt', 'r');

    const watcher = fs.watch('./commands.txt');

    for await(const event of watcher){
        if(event.eventType === 'change' ){
            console.log('the file was changed')
        }
    }
}) ();
 