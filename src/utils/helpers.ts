export const checkWord = async (word: string) => {
    fetch("/api/check", {
        body: JSON.stringify({word: word})
    }).then(response => {
        response.json().then(message => {
            console.log(message);
        }).catch(err => {
            console.log('error fetching');
        })
    }).catch(err => {
        console.log('error');
    })
}