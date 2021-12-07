export default function CommonQuestions() {
  return (
    <div className="block pt-5 mt-2">
      <div className="pt-5 mt-3 border-t border-blue-400 border-opacity-25">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12">
          <div>
            <dt className="text-lg font-medium leading-6 lg:text-xl ">
              How does this app work?
            </dt>
            <dd className="mt-2 text-sm">
              Use your phone to scan the label of the postage and photograph the
              items you're shipping to customers. It takes a few seconds per
              order.
              <br /> <br />
              If a dispute happens we'll help you put together the paperwork
              showing your photo scans, a verification from USPS that the
              shipping address exists, evidence to show the order wasn't missing
              any items, tracking screenshots, and a personalized case response
              for your unique situation to help you win the most common types of
              chargebacks.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-medium leading-6 lg:text-xl ">
              Does this app work with my shipping carrier?
            </dt>
            <dd className="mt-2 text-sm">
              Yes! You can scan your orders on our app for all shipping
              carriers. From USPS to A La Poste, you can ship anywhere and give
              yourself a layer of protection from fraud.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-medium leading-6 lg:text-xl ">
              How long are photos stored?
            </dt>
            <dd className="mt-2 text-sm">
              Photos are stored for up a full year which far-exceeds the allowed
              chargebacks periods for all orders. You can view any of your
              photos by entering the tracking number in search.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-medium leading-6 lg:text-xl ">
              Do you guarantee wins?
            </dt>
            <dd className="mt-2 text-sm">
              We'll help you recover your money from lost orders and disputes on
              all free and paid plans, but we can't promise you wins for every
              dispute. In some rare shipments you might actually be at fault if
              you entered a customer's address with a spelling mistake.
              <br /> <br />
              Our app is intended to improve your quality assurance process and
              optimize your dispute responses to give you the best chance at
              winning. All of the money we help you recover is yours to keep.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-medium leading-6 lg:text-xl ">
              How is this different from Route?
            </dt>
            <dd className="mt-2 text-sm">
              Route is an insurance company that allows your store to charge
              customers a fee (typically $0.99) to protect their order from
              theft. A majority of this payment goes to Route and you will still
              absord any chargebacks from customers.
              <br /> <br />
              DisputeCore doesn't take any fees from customer orders and doesn't
              interact with customer payments. Your payments are fully yours and
              you can use our app to prevent disputes from happening.
              <br /> <br />
              You can combine Route Insurance to give customers the option of a
              paid delivery protection in combination with DisputeCore to insure
              yourself from wrongful chargebacks, even from the customers who
              didn't purchase Route's insurance.
            </dd>
          </div>

          <div>
            <dt className="text-lg font-medium leading-6 lg:text-xl ">
              How do you prevent disputes?
            </dt>
            <dd className="mt-2 text-sm">
              We'll monitor your shipments and give you feedback when an order
              is being delayed in it's delivery, returned, or lost by your
              shipping carrier.
              <br /> <br />
              Messaging customers affected by carrier-issues is an easy way of
              preventing disputes from happening. When customers know a cause
              for an order delay it's less likely to be escalated to the big
              banks as a chargeback.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
