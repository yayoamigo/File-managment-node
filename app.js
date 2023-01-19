const fs = require('fs/promises');

( async () => {
    const watcher = fs.watch('./');

    for await(const event of watcher){
        if(event.eventType === 'change' && event.filename === 'commands.txt'){
            console.log('the file was changed')
        }
    }
}) ();
 