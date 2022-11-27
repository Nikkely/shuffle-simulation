import { motion } from "framer-motion"

type CardProps = {
    x: number
    color: string
}

function Card(props: CardProps) {
    return (
        <motion.div
            style={{
                backgroundColor: props.color,
                width: "5px",
                height: "30px",
                position: "absolute"
            }}
            animate={{
                x: props.x,
            }}
            transition={{
                duration: 2
            }}
        />
    );
}

export default Card;
