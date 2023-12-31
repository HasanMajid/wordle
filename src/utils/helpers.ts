export const checkWord = async (word: string) => {
    fetch("/api/check/" + word)
        .then(response => {
            response.json().then(message => {
                console.log(message);
            }).catch(err => {
                console.log('error fetching');
            })
        }).catch(err => {
            console.log('error');
        })
}