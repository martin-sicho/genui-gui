import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import PageAlertContext from '../../vibe/components/PageAlert/PageAlertContext';
import '../styles.css'

/*
 * Component which serves the purpose of a "root route component".
 * 
 * Source: https://stackoverflow.com/a/54112771
 */
class RoutedPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notFound : false
    };
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };

  handleResponseErrors = (
    response,
    message='Failed to fetch data from backend.',
    showAlert=false,
    callback=null
  ) => {
    if (!response.ok) {
      if (showAlert) {
        this.showAlert(message);
      }
      console.log(response);
      response.json()
        .then(data => {
          console.log(data);
          if (callback) {
            callback(data);
          }
        })
        .catch(e => console.log(e));
      throw new Error(message);
    } else {
      return response.json();
    }
  };

  showAlert = (message, severity='danger') => {
    this.context.setAlert(message, severity);
  };

  retryAction = (action, message='', severity='danger', interval=5000) => {
    if (message) {
      this.showAlert(message + ` (retrying in ${interval / 1000} seconds)`, severity);
    }
    console.log(message + ` Retrying in ${interval / 1000} seconds...`);
    this.sleep(interval)
      .then(action)
    ;
  };

  /**
   * Here, we use a component prop to render
   * a component, as specified in route configuration
   */
  render() {
    if (this.state.notFound) {
      return <Navigate to='/404' />
    }

    return <this.props.component {...this.props} retryAction={this.retryAction} handleResponseErrors={this.handleResponseErrors} setNotFound={(status) => this.setState({notFound: status})} />
  }
}
RoutedPage.contextType = PageAlertContext;

// wrap the component to take advantage of hooks
const Export = (props) => {
  const setPageHeader = props.setPageHeader;
  const setTitle = props.setPageTitle;
  const title = props.title;
  const setPageHeaderTitle = props.setPageHeaderTitle;
  const projectName = props.currentProject && props.title !== 'Projects' ? ' (' + props.currentProject.name + ')' : '' ;
  useEffect(() => {
    setTitle(title + projectName);
    setPageHeaderTitle(title + projectName);
    setPageHeader(null);
  }, [title, setPageHeader, setTitle, setPageHeaderTitle, projectName]);
  return (<RoutedPage {...props} router={{params: useParams(), navigate: useNavigate(), location: useLocation()}}/>);
}
export default Export;