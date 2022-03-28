function RandomImage() {

    const randomImage = () => {
        const seedArray = []
        const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        for (let i = 0; i < 5; i++) {
            seedArray.push(alphabet[Math.floor(Math.random() * 25)])
        }
        const seed = seedArray.join("")
        const image = "https://identicon-api.herokuapp.com/" + seed + "/50?format=png"
        return image
    }

    return (
        <img src={randomImage()} alt=""></img>
    )
}

export default RandomImage;