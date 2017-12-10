import React, {PropTypes as PT} from 'react';
import classes from './index.css';
import {dv} from './utils';

const searchBar = ({props}) => (
  <div>
    <div
      className={`row ${classes.importRow}`}
    >
      <div className={`col-sm-8 ${classes.centerCol}`}>
        <form action="#" onSubmit={(event) => props.addDevFromName(dv('#dev-name'), event)}>
          <div className="input-group">
            <span
              className="input-group-addon" style={{
                minWidth: 120,
              }}
            >
              Usered
            </span>
            <input
              autoFocus={!props.developers.length}
              id="dev-name" className="form-control"
              type="text" placeholder="e.g. omelhoro"
            />
            <span className="input-group-btn">
              <button
                id="import-developer" className="btn btn-default" type="submit"
              >
                Import!
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>

    <div
      className={`row ${classes.importRow}`}
    >
      <div className={`col-sm-8 ${classes.centerCol}`}>
        <form action="#" onSubmit={(event) => props.addDevFromOrg(dv('#org-name'), event)}>
          <div className="input-group">
            <span
              className="input-group-addon" style={{
                minWidth: 120,
              }}
            >
              Organization
            </span>
            <input id="org-name" className="form-control" type="text" placeholder="e.g. Homebrew" />
            <span className="input-group-btn">
              <button
                id="import-organization"
                className="btn btn-default"
                type="submit"
              >
                Import!
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
);

searchBar.propTypes = {
  props: PT.object.isRequired,
  addDevFromOrg: PT.func,
};

export default searchBar;
