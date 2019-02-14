import { NextContext, NextFC } from 'next';
import { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

type FindOwnersPageProps = {
  owners?: any[];
  lastName?: string;
};

const FindOwnersPage: NextFC<FindOwnersPageProps> = ({ owners, lastName }) => {
  const [filter, setFilter] = useState(lastName);

  const handleFilterChange: FormEventHandler<HTMLInputElement> = event => {
    setFilter(event.currentTarget.value);
  };
  const submitSearchForm: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    Router.push({
      pathname: '/owners/list',
      query: { lastName: filter || '' },
    });
  };

  return (
    <>
      <section>
        <h2>Find Owners</h2>
        <form className="form-horizontal" onSubmit={submitSearchForm}>
          <div className="form-group">
            <div className="control-group" id="lastName">
              <label className="col-sm-2 control-label">Last name </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  name="filter"
                  value={filter || ''}
                  onChange={handleFilterChange}
                  size={30}
                  maxLength={80}
                />
                {/* <span className='help-inline'><form:errors path='*'/></span> TODO */}
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <input type="submit" className="btn btn-default">
                    Find Owner
                  </input>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      {/* <OwnersTable owners={owners} />*/}
      <Link href="/owners/new">
        <a className="btn btn-default">Add Owner</a>
      </Link>
    </>
  );
};

FindOwnersPage.getInitialProps = async ({
  query,
}: NextContext<{ lastName?: string }>) => {
  const lastName = query.lastName;
  if (typeof lastName === 'string') {
    const owners = await fetchData(lastName);
    return {
      owners,
      lastName,
    };
  }
  return {};
};

function fetchData(filter: string) {
  const query = filter ? encodeURIComponent(filter) : '';

  return fetch('api/owner/list?lastName=' + query).then(res => res.json());
}

export default FindOwnersPage;
