import Utils from 'Utils'

const elements = Utils.Elements.elementsSymbols

type BreakiWordProps = {
  word: string
  show: boolean
}

function BreakiWord({ word, show }: BreakiWordProps) {
  const lowerCaseWord = word.toLocaleLowerCase()

  const allCombinations = lowerCaseWord
    .split('')
    .reduce((acc, value, index, original) => {
      if (original[index + 1] !== undefined) {
        acc.push(`${value}${original[index + 1]}`)
      }
      return acc
    }, [] as string[])

  const element = allCombinations.find((combination) =>
    elements.includes(combination)
  )

  const occurrence: number | '' | undefined =
    element && lowerCaseWord.indexOf(element)

  if (
    !show ||
    occurrence === undefined ||
    occurrence === '' ||
    element === undefined
  ) {
    return <h2 className="font-bold capitalize mb-20">{word}</h2>
  }

  const findSymbol = Utils.Elements.findElementBySymbol(element)

  const firstText = lowerCaseWord.substring(0, occurrence)
  const lastText = lowerCaseWord.substring(occurrence + 2)

  return (
    <h2 className="font-bold capitalize mb-20">
      {firstText && <span>{firstText}</span>}
      <span className="capitalize p-4 bg-[#055036] relative">
        <span>{element}</span>
        {findSymbol && (
          <div className="absolute bottom-1 right-1 text-sm">
            {findSymbol.name}
          </div>
        )}
        {findSymbol && (
          <div className="absolute top-1 right-1 text-base">
            {findSymbol.number}
          </div>
        )}
      </span>
      {lastText && <span className="lowercase">{lastText}</span>}
    </h2>
  )
}

export default BreakiWord
