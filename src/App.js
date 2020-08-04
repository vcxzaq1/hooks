import React, { useState, useEffect } from "react";
import axios from 'axios'

export default () => (
  <>
    <h1>Gucci Mane</h1>
    {theStateOne()}
    {theEffectOne()}
  </>
);

function theStateOne() {
  const [ name, setName ] = useState('')
  const [ aoty, setAoty ] = useState([])

  return (
    <div>
      {aoty.map(a => <h1 key={a}>{a}</h1>)}
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <br />
      <button disabled={!name} onClick={() =>
        {
          setAoty([...aoty, name])
          setName('')
        }
      }>Add it</button>
    </div>
  )
}

function theEffectOne() {
  const [status, setStatus] = useState({
    pending: true,
    error: null,
  })
  const [advice, setAdvice] = useState(null)

  const getYouSomeAdvice = () => (
    axios.get('https://api.adviceslip.com/advice')
      .then(res => {
        setStatus({
          pending: false,
          error: null,
        })
        setAdvice(res.data.slip.advice)
      })
      .catch(err => {
        setStatus({
          pending: false,
          error: "Something broke",
        })
      })
  )

  // ComponentDidMount
  // Return -> ComponentWillUnMount aka cleanup
  // [asdasdasd] -> componentDidUpdate
  // [] -> Mount & Unmount
  useEffect(() => {
    getYouSomeAdvice()
  }, [])

  const { pending, error } = status
  if (pending) return 'Loading...'
  if (error) return error
  return (
    <>
      <h1>the advice api.</h1>
      {advice}
      <br />
      <button onClick={() => getYouSomeAdvice()} type="button">more!!!</button>
    </>
  )
}

function theCustomOnes() {

}
