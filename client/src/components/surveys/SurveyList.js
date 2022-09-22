import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return (
                <div class="card blue-grey darken-1" key={survey.id}>
                    <div class="card-content white-text">
                        <span class="card-title">{survey.Title}</span>
                    <p>
                        {survey.body}
                    </p>
                    <p className="right">
                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                    </div>
                    <div class="card-action white-text">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no} </a>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
            {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({ surveys }){
    return { surveys };
}

export default connect(mapStateToProps,{ fetchSurveys }) (SurveyList);
