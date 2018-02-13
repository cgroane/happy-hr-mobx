import React, {Component} from 'react';
import stories from './../story.json';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            story: null,
            choices: []
        }

        this.selectOption = this.selectOption.bind(this);
    }
    componentDidMount() {
        this.setState({
            story: stories[0].story,
            choices: stories[0].choices
        })
    }
    selectOption(id) {
        var selected = stories.find((x) => x.id == id);
        console.log(id)
        this.setState({
            story: selected.story,
            choices: selected.choices
        })
    }

    render() {
        const options = this.state.choices.map((cur,ind, arr) => {
            return (
                <button key={cur.id} value={cur.id} onClick={(value) => this.selectOption(value.target.value)} > {cur.text} </button>
            )
        })
        return (
            <div>
                <div>{this.state.story}</div>
                <div>{options}</div>
            </div>
        )
    }
}
export default Page;