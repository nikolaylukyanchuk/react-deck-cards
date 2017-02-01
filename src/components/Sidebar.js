import React from 'react';
import ReactDOM from 'react-dom';
import { connect  } from 'react-redux';
import {addDeck, showAddDeck, hideAddDeck} from '../actions';
import {Link} from 'react-router';

const mapStatetoProps = ({ decks, addingDeck}) => ({
    decks,
    addingDeck
});

const mapDispatchToProps = dispatch => ({
    addDeck : name => dispatch(addDeck(name)),
    showAddDeck: () => dispatch(showAddDeck()),
    hideAddDeck: () => dispatch(hideAddDeck())
});

const Sidebar = React.createClass({
    componentDidUpdate() {
        let el = ReactDOM.findDOMNode(this.refs.add);
        if (el) el.focus();
    },

    render() {
        let props = this.props;

        console.log(props);
        return (<div className='sidebar'>
            <h2> All Decks </h2>
            <ul>
                {
                    props.decks.map((deck, i) => {
                        return  <li key={i}>
                            <Link to={`/deck/${deck.id}`}>
                            {deck.name}
                            </Link>
                        </li>
                    })
                }
            </ul>
            {props.addingDeck && <input ref="add" onKeyPress={this.createDeck}/>}
        </div>)
    },
    createDeck(evt){
        if (evt.which !== 13) return;

        let name = ReactDOM.findDOMNode(this.refs.add).value;
        this.props.addDeck(name);
        this.props.hideAddDeck()
    }
});

export default connect(mapStatetoProps, mapDispatchToProps)(Sidebar);