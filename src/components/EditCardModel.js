import { updateCard, deleteCard } from '../actions';
import { connect } from 'react-redux';
import CardModel from './CardModal';

const mapStateToProps = ({ cards }, { params : {cardId} }) => ({
    card: cards.filter(card => card.id === parseInt(cardId))[0]
});

const mapDispatchToProps = dispatch => ({
    onSave: card => dispatch(updateCard(card)),
    onDelete: cardId => dispatch(deleteCard(cardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModel);