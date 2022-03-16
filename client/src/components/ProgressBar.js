import React from "react";

import { ProgressBar } from 'react-bootstrap';


const ProgressBars = (props) => {

  return (
    <div>
      <ProgressBar>
      {/* {props.languages?.map((language) => (
        // <ProgressBar striped variant="success" now={language.count} key={1} />
        // <ProgressBar variant="warning" now={language.count} key={2} />
        // <ProgressBar striped variant="danger" now={language.count} key={3} />
        ))} */}
      </ProgressBar>   
    </div>
  );
};

export default ProgressBars;
