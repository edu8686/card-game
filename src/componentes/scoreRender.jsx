

function ScoreRender({currentScore, bestScore}) {

    return (
        <div>
            <h3>Current Score</h3>
            <p>{currentScore}</p>
            <h3>Best Score</h3>
            <p>{bestScore}</p>
        </div>
    )
}

export default ScoreRender