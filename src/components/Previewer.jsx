import React from "react"
import styles from "../css/previewer.module.css"
import { marked } from "marked"

class Previewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            html: "",
            input: ''
        }

    }

    handleChange = (evt) => {
        const markdown = evt.target.value,
            html = marked(markdown)
        this.setState({
            html,
            input: evt.target.value
        })

    }

    clear(evt) {
        this.setState({
            html: "",
            input: ""
        })
    }

    copy = async (evt) => {
        try{
            await navigator.clipboard.writeText(this.state.input)
        } catch(e) {
            console.error("Failed to copy text: ", e)
        }
    }

    render() {
        return (
            <>
                <h1 className={styles.title}>Welcome to my Markdown Previewer </h1><div className={styles.containerTexts}>
                    <div className={styles.containerEditor}>
                        <textarea value={this.state.input} className={styles.editor} type="textarea" onChange={this.handleChange} placeholder="type some marked text..." id="editor" />
                        <div className={styles.containerButtons}>
                            <button onClick={this.clear.bind(this)} className={styles.clearButton}>CLEAR</button>
                            <button onClick={this.copy.bind(this)} className={styles.copyButton}>COPY</button>
                        </div>
                    </div>
                    <div className={styles.containerPreviewer}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.html }} value={this.state.html} className={styles.preview} id="preview"></div>
                    </div>
                </div>
                <p className={styles.footer}>just a simple markdown previewer</p>
            </>
        )
    }
}

export default Previewer