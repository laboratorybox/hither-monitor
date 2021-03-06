FROM ubuntu:18.04

#########################################
### Node 12 and yarn
### best to do this before python
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get update && apt-get install -y nodejs
RUN npm install -g yarn

#########################################
### Python                                                               
RUN apt-get update && apt-get -y install git wget build-essential
RUN apt-get install -y python3 python3-pip
### Make sure we have python3 and a working locale
RUN (rm /usr/bin/python || true) && ln -s python3 /usr/bin/python && (rm /usr/bin/pip || true) && ln -s pip3 /usr/bin/pip
ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'
RUN apt-get install -y locales && locale-gen en_US.UTF-8
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y python3-tk

#########################################
### Numpy
RUN pip install numpy

RUN pip install ipython jupyter jupyterlab
RUN pip install pymongo
RUN pip install flask
RUN pip install python-dotenv simplejson

# nano
RUN apt-get install -y nano

# #########################################
# ### Install kachery
RUN git clone https://github.com/flatironinstitute/kachery /kachery \
    && cd /kachery \
    && git checkout 73ebdec452e72eb9da2c2bb3424300a0893d20ac \
    && pip install .

# #########################################
# ### Install hither2
RUN git clone https://github.com/laboratorybox/hither2 /hither2 \
    && cd /hither2 \
    && git checkout 7163330960c113c815dbe6958859def3a9cca3c9 \
    && pip install .

RUN yarn global add serve

# #########################################
# ### Install hither-monitor
RUN git clone https://github.com/laboratorybox/hither-monitor /hither-monitor \
    && cd /hither-monitor \
    && git checkout 07a340682102d43cd7f0017fe22c1ee5fc97c48e \
    && yarn install \
    && yarn build \
    && rm -rf node_modules

COPY run_inside_container.sh /run_inside_container.sh

ENTRYPOINT [ "/run_inside_container.sh" ]