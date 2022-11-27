import { motion } from "framer-motion"

type CardProps = {
    x: number
    // y: number
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
                // y: props.y
            }}
            transition={{
                duration: 2
            }}
        />
    );
}

export default Card;
