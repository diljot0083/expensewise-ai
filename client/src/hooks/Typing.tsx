import { useEffect, useState } from "react"


const Typing = ({ message = '', speed = 45 }) => {

    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < message.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + message.charAt(index));
                setIndex(index + 1);
            },speed);

            return () => clearTimeout(timeout);
        }
    }, [index, message, speed]);

    return (
        <span className="whitespace-pre-wrap">{text}</span>
    );
};
export default Typing;