import React from "react";
import { Link } from "react-router-dom";

const Modal = () => {
  return (
    <div
      class="modal fade"
      id="matchModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="matchModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="matchModalLabel">
                You made a match!
            </h1>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            > Profile
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Contact and begin collaborating. </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary gradient"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary gradient">
              <Link
                className="btn btn-block btn-squared btn-light text-dark"
                // to=
                // // {`/profiles/${profile._id}`}
              >
                Meet your match.
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
