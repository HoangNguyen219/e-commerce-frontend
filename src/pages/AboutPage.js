import React from "react";
import PageHero from "../components/PageHero";
import styled from "styled-components";
import aboutImage from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />;
      <Wrapper className="page section section-center">
        <img src={aboutImage} alt="About image" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            distinctio sequi natus, nostrum, recusandae minus odio facere
            exercitationem, assumenda magni voluptate. Corporis vitae quia
            deserunt quae doloribus, consequuntur officiis sint neque ullam
            mollitia voluptatum aut unde quis rem a quasi?
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
