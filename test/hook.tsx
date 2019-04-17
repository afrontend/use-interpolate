import * as React from 'react'
import test from 'ava'
import { renderHook } from 'react-hooks-testing-library'
import useInterpolate, { createHook } from '../src/index'

import './_browserEnv'

test('reRender', t => {
    const { result, rerender } = renderHook(text => useInterpolate(text, {}), { initialProps: 'abc' })
    t.deepEqual(result.current, <>abc</>)
    rerender('efg')
    t.deepEqual(result.current, <>efg</>)
})

test('change bracket', t => {
    const useInterpolate = createHook({ tag: ['[', ']'] })
    const { result } = renderHook(() => useInterpolate('abc[0]<0>efg</0>[/0]', { 0: <span/> }))
    t.deepEqual(result.current, <>abc<span>{`<0>efg</0>`}</span></>)
})
