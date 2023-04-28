import React from 'react';
import { PageHero } from '../components';
import styled from 'styled-components';
import aboutImage from '../assets/hero-bcg.jpeg';

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />;
      <Wrapper className="page section section-center">
        <img src={aboutImage} alt="Nice Table" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
            repellendus tempore corporis iste odio eius nihil modi quidem natus
            et? Omnis dolorem consectetur, incidunt aut, dolorum reprehenderit
            molestiae optio totam magnam officiis placeat nam harum, dolor eaque
            beatae quas consequatur? Deleniti vero ratione incidunt pariatur
            atque quasi accusantium iusto! Quaerat excepturi tempore ad debitis
            aperiam. Reiciendis delectus esse ut provident.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default AboutPage;
