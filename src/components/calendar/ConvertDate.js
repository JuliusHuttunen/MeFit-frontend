const ConvertDate = (props) => {

    const day = props.date.getDate()
    const month = props.date.getMonth() + 1
    const year = props.date.getFullYear()
    const pre = props.text

    return (<div>{pre} {day}.{month}.{year}</div>)

}

export default ConvertDate